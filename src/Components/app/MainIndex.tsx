import { Box, Flex, Tabs, Text } from "@radix-ui/themes";
import React from "react";

const MainIndex = () => {
  return (
    <Box className="p-2">
      {/* Header image and title */}
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
        <Tabs.Root defaultValue="keywords">
          <div className="w-full">
            {/* Tab List */}
            <Tabs.List className="flex space-x-6 border-b-2 border-gray-300">
              <Tabs.Trigger
                className="text-lg py-2 px-4 cursor-pointer font-medium border-b-2 border-transparent hover:border-black focus:outline-none"
                value="keywords"
              >
                Keywords
              </Tabs.Trigger>
              <Tabs.Trigger
                className="text-lg py-2 px-4 cursor-pointer font-medium border-b-2 border-transparent hover:border-black focus:outline-none"
                value="leads"
              >
                Leads
              </Tabs.Trigger>
              <Tabs.Trigger
                className="text-lg py-2 px-4 cursor-pointer font-medium border-b-2 border-transparent hover:border-black focus:outline-none"
                value="settings"
              >
                Settings
              </Tabs.Trigger>
              <Tabs.Trigger
                className="text-lg py-2 px-4 cursor-pointer font-medium border-b-2 border-transparent hover:border-black focus:outline-none"
                value="plus"
              >
                +
              </Tabs.Trigger>
            </Tabs.List>

            {/* Tab Content */}
            <Tabs.Content className="pt-6 text-center" value="keywords">
              <div>
                <h2 className="text-2xl font-semibold">Keywords</h2>
                <p>Coming soon...</p>
              </div>
            </Tabs.Content>

            <Tabs.Content className="pt-6 text-center" value="leads">
              <div>
                <h2 className="text-2xl font-semibold">Leads</h2>
                <p>Coming soon...</p>
              </div>
            </Tabs.Content>

            <Tabs.Content className="pt-6 text-center" value="settings">
              <div>
                <h2 className="text-2xl font-semibold">Settings</h2>
                <p>Coming soon...</p>
              </div>
            </Tabs.Content>

            <Tabs.Content className="pt-6 text-center" value="plus">
              <div>
                <h2 className="text-2xl font-semibold">+</h2>
                <p>Coming soon...</p>
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default MainIndex;
