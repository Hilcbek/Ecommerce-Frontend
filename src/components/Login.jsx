import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRegister from "../../Hooks/useRegisterHook";
import Modal from "../husky/Modal";
import Input from "../husky/Input";
import { CiUser } from "react-icons/ci";
import { MdEmail, MdPassword } from "react-icons/md";
import { baseUrl } from "../../libs/op";
import useLogin from "../../Hooks/useLoginHook";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { LOGIN_ACTION } from "../../Toolkit/Slice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../libs/firebase";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  let regModal = useRegister();
  let logModal = useLogin();
  let [data, setData] = useState(null);
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  let [_, setCookies] = useCookies();
  let onSubmit = async (data) => {
    setLoading(true);
    let { username, password } = data;
    baseUrl
      .post("/auth/login", {
        username,
        password,
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.data) {
          setCookies("access_token", data.data.token);
          dispatch(
            LOGIN_ACTION({
              id: data.data._id,
              username: data.data.username,
              isAdmin: data.data.isAdmin,
            })
          );
          logModal.onClose();
          reset({
            username: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
    let [loadingGoogleAuth, setLoadingGoogleAuth] = useState(false);
  let handleGoogle = async () => {
    try {
      setLoadingGoogleAuth(true);
      let googleProvider = new GoogleAuthProvider();
      let auth = getAuth(app);
      let result = await signInWithPopup(auth, googleProvider);
      let res = await baseUrl.post("/auth/google-sign-in", {
        username: result.user.displayName,
        email: result.user.email,
      });
      if(res.data){
        setCookies("access_token", res.data.token);
        dispatch(
          LOGIN_ACTION({
            id: res.data._id,
            username: res.data.username,
            isAdmin: res.data.isAdmin,
          })
        );
        logModal.onClose()
      }
    } catch (error) {
      toast.error(`Error while logging you!`);
    } finally {
      setLoadingGoogleAuth(false);
    }
  };
  let Body = (
    <div className="w-full flex items-start justify-start flex-col gap-3">
      <Input
        label={"Username"}
        register={register}
        type="text"
        disabled={loading}
        disabled2={loadingGoogleAuth}
        id={"username"}
        errors={errors}
        required
        icon={<CiUser size={15} />}
      />
      <Input
        label={"Password"}
        register={register}
        type="password"
        disabled={loading}
        disabled2={loadingGoogleAuth}
        id={"password"}
        errors={errors}
        required
        icon={<MdPassword size={15} />}
      />
    </div>
  );
  let handleFooter = () => {
    regModal.onOpen();
    setTimeout(() => {
      logModal.onClose();
    }, 100);
  };
  let Footer = (
    <div className="flex items-center justify-center gap-2 text-sm tracking-wide text-gray-600 font-Fredoka">
      <label htmlFor="login">Don't have an account?</label>
      <button onClick={handleFooter} className="hover:text-black italic">
        Sign-up
      </button>
    </div>
  );
  return (
    <Modal
      open={logModal.open}
      Body={Body}
      onSubmit={handleSubmit(onSubmit)}
      disabled={loading}
      Header={"Habesha Market Hub"}
      Footer={Footer}
      Title={"Sign-up"}
      label={"Sign-up"}
      disabled_2={loadingGoogleAuth}
      label2={"Continue with google"}
      icon={<FcGoogle size={17} />}
      onSubmit_2={handleGoogle}
    />
  );
};

export default Login;
