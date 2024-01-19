import React from "react";

import CardWrapper from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {};

const ErrorCard = (props: Props) => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;

// <Card className="w-[400px] shadow-md">
//       <CardHeader>
//         <Header label="Oops! Something went wrong!" />
//       </CardHeader>
//       <CardFooter>
//         <BackButton label="Back to login" href="/auth/login" />
//       </CardFooter>
//     </Card>
