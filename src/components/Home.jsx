import { useForm } from "react-hook-form";
import coin from "/coin.jpg";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./dashboard/Dashboard";

export default function Home() {
  const navigation = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const { numberOrEmail, PIN } = values;
    console.log(numberOrEmail, PIN, values);

    try {
      const res = await axios.get(
        `http://localhost:5000/my-data?pn=${numberOrEmail}&pin=${PIN}`,
        values
      );
      console.log(res.data);
      if (res.data._id) {
        return navigation("/dashboard", { state: res.data });
      } else {
        return setErrMsg(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    // useEffect(() => {
    //   getData();
    // }, []);
  }
  console.log(errMsg);
  return (
    <div className="container md:w-1/2 mx-auto p-5">
      <img src={coin} className="size-12 m-auto block rounded-full"></img>
      <h1 className="font-bold md:text-xl">
        Please login to your my cash account
      </h1>
      <div className="pt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.numberOrEmail}>
            <FormLabel htmlFor="numberOrEmail">
              Enter account number or email
            </FormLabel>
            <Input
              id="numberOrEmail"
              placeholder="Phone number or email"
              {...register("numberOrEmail", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.numberOrEmail && errors.numberOrEmail.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.PIN}>
            <FormLabel htmlFor="PIN">Enter you PIN</FormLabel>
            <Input
              id="PIN"
              placeholder="PIN"
              {...register("PIN", {
                required: "PIN is required",
              })}
            />
            <FormErrorMessage>
              {errors.PIN && errors.PIN.message}
              {errMsg && <p className="text-sm font-bold">{errMsg}</p>}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit">
            Submit
          </Button>
          <div className="py-4">
            <h1>
              Do not have an account? Please{" "}
              <Link to="/my-cash-register" className="font-bold underline">
                create
              </Link>
              {" account"}
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}
