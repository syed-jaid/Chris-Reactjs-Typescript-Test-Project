import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import TabsIndex from "./TabsIndex";

const MainIndex = () => {
  return (
    <Box className="p-2">
      {/* header image and title */}
      <Flex gap="2" align="center">
        <img src="https://i.ibb.co.com/XyHcGyp/test-logo.png" alt="Test Logo" />
        <Text className="text-[14px] font-semibold">React Demo Project</Text>
      </Flex>
      {/* tap title  */}
      <Box mt="8">
        <Text className="text-[21px] text-roboto">
          <span className="text-[#29292980]">Campaign </span>
          <span className="text-[#292929] font-bold">Search CA</span>
        </Text>
        {/* all tabs  */}
        <TabsIndex />
      </Box>
    </Box>
  );
};

export default MainIndex;
