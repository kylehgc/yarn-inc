import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

export default function WithSubnavigation({colors, fonts}) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={colors[3]}
        color={colors[1]}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        
        
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={colors[1]}>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav colors={colors} fonts={fonts}/>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            color={colors[4]}
            fontFamily={fonts[0]}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
            Sign in
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            fontFamily={fonts[0]}
            color={colors[2]}
            bg={colors[4]}
            href={'#'}
            _hover={{
              bg: colors[3],
            }}>
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav colors={colors} fonts={fonts} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({colors,fonts}) => {
  const linkColor = colors[1]
  const linkHoverColor = colors[4]
  const popoverContentBgColor = colors[4]

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontFamily={fonts[0]}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav colors={colors} fonts={fonts}key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, colors,fonts}) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: colors[5] }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text color={colors[2]} fontFamily={fonts[0]}
            transition={'all .3s ease'}
            _groupHover={{ color: colors[1] }}
            fontWeight={500}>
            {label}
          </Text>
          <Text color={colors[2]} fontFamily={fonts[1]} fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={colors[2]} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({colors,fonts}) => {
  return (
    <Stack
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem colors={colors} fonts={fonts} key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href,colors,fonts }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontFamily={fonts[0]}
          fontWeight={600}
          color={colors[4]}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link color={colors[4]} fontFamily={fonts[1]} key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};



const NAV_ITEMS = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
];