import { useForm } from "react-hook-form";
import coin from "/coin.jpg";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    const { numberOrEmail, PIN } = values;
  }

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
                pattern: { value: /^[0-9]+$/, message: "Only number is valid" },
                minLength: { value: 5, message: "PIN length should be 5" },
              })}
            />
            <FormErrorMessage>
              {errors.PIN && errors.PIN.message}
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
