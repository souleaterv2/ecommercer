import {
  ScaleFade,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { useGlobal } from "../../hooks/useGlobal";
import { CustomModal } from "../CustomModal";
import { SignForm } from "../Form/SignForm";
import { SignUpForm } from "../Form/SignUPForm";

export const LoginModal = (): JSX.Element => {
  const { isLoginModelOpen, handleLoginModel } = useGlobal();

  return (
    <CustomModal
      isOpen={isLoginModelOpen}
      onRequestClose={handleLoginModel}
      onClickClose={handleLoginModel}
    >
      <Tabs colorScheme='pink'  variant='solid-rounded' backgroundColor="gray.800" borderRadius="lg" padding="4">
        <TabList>
          <Tab>Sign</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ScaleFade initialScale={0.9} in={true}>
              <SignForm />
            </ScaleFade>
          </TabPanel>
          <TabPanel>
            <ScaleFade initialScale={0.9} in={true}>
              <SignUpForm />
            </ScaleFade>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CustomModal>
  );
};
