import CardWrapper from "./CardWrapper";
import FormSuccess from "../share/FormSuccess";
import FormError from "../share/FormError";

type Props = {
  message: string;
  success: boolean;
};

const NewVerificationForm2 = ({ message, success }: Props) => {
  return (
    <CardWrapper
      headerLabel="Confirm you verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {success ? (
          <FormSuccess message={message} />
        ) : (
          <FormError message={message} />
        )}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm2;
