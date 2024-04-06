import { ArrowUpIcon } from '@chakra-ui/icons';
import { Flex, useColorModeValue } from '@chakra-ui/react';

export const BackToTop = ({ isElementInView }: { isElementInView: boolean }) => (
  <Flex
    pos="fixed"
    bottom="16"
    right={isElementInView ? -16 : [6, 12, 16]}
    w="14"
    h="14"
    bgColor={useColorModeValue('white', 'blue.700')}
    borderColor={useColorModeValue('black', 'white')}
    borderWidth="2px"
    align="center"
    justify="center"
    rounded="100%"
    cursor="pointer"
    _hover={{
      bgColor: useColorModeValue('gray.200', 'gray.600')
    }}
    transition="background-color 0.5s, right 0.5s"
    onClick={() => window.scrollTo(0, 0)}
  >
    <ArrowUpIcon boxSize="6" />
  </Flex>
);
