"use client";

import { BeatLoader } from "react-spinners";
import CardWrapper from "./CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../share/FormSuccess";
import FormError from "../share/FormError";

type Props = {};

const NewVerificationForm = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (token) {
      newVerification(token)
        .then((data: any) => {
          console.log("onSubmit data", data);
          if (data?.success) setSuccess(data.success);
          if (data?.error) setErrorMessage(data.error);
        })
        .catch((err) => {
          console.log("err", err);
          setErrorMessage(`Something went wrong! ${err.message}`);
        });
    } else {
      setErrorMessage("Missing token!");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm you verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !errorMessage && <BeatLoader />}

        <FormSuccess message={success} />
        <FormError message={errorMessage} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
