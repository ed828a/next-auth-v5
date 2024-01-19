import { Button } from "@/components/ui/button";
import { auth, signOut } from "../../../auth";

type Props = {};

const SettingsPage = async (props: Props) => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session, null, 4)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button variant={"outline"} type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
