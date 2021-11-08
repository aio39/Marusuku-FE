import { ReactElement } from "react";
import DefaultLayout from "../layouts/DefaultLayout";


export default function Page() {
  return (
      <div>
          child
      </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<DefaultLayout>{page}</DefaultLayout>)
};
