import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FiPlay, FiInfo, FiStar, FiClock, FiCalendar } from "react-icons/fi";

function Home() {
  const featuredMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      genre: "Sci-Fi/Adventure",
      rating: 4.8,
      duration: "2h 46m",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143546/dune-part-two_c118.600_db45k2.webp",
    },
    {
      id: 2,
      title: "The Batman",
      genre: "Action/Crime",
      rating: 4.5,
      duration: "2h 56m",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143603/images_whugrz.jpg",
    },
    {
      id: 3,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi/Adventure",
      rating: 4.3,
      duration: "3h 12m",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143648/images_1_dmgsro.jpg",
    },
  ];

  const nowShowing = [
    {
      id: 4,
      title: "Black Panther: Wakanda Forever",
      genre: "Action/Adventure",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143710/images_2_yppfxv.jpg",
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      genre: "Action/Drama",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143745/images_3_e9izpv.jpg",
    },
    {
      id: 6,
      title: "Jurassic World Dominion",
      genre: "Action/Adventure",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143822/Jurassic_World_Dominion_Team_Poster_k8lbok.webp",
    },
    {
      id: 7,
      title: "Doctor Strange 2",
      genre: "Action/Fantasy",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143942/MV5BN2YxZGRjMzYtZjE1ZC00MDI0LThjZmQtZTZmMzVmMmQ2NzBmXkEyXkFqcGc_._V1_FMjpg_UY2500__pawnkb.jpg",
    },
  ];

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Box position="relative" h="100vh">
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="blackAlpha.600"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bgImage="url('https://res.cloudinary.com/nil2022/image/upload/v1751144059/The-Batman-Poster-Riddler-Penguin-Catwoman-Villains_pmsjhg.avif')"
          bgSize="cover"
          bgPosition="center"
        />
        <Box
          position="relative"
          h="full"
          display="flex"
          alignItems="center"
          px={{ base: 4, md: 8, lg: 16 }}
        >
          <Stack maxW="2xl" spacing={6}>
            <Text
              bg="red.600"
              px={3}
              py={1}
              rounded="full"
              w="fit-content"
              fontSize="sm"
              fontWeight="semibold"
            >
              Now Showing
            </Text>
            <Heading
              as="h1"
              size={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
            >
              The Batman
            </Heading>
            <Flex align="center" gap={6}>
              <Flex align="center">
                <Icon as={FiStar} color="yellow.400" mr={1} />
                <Text>4.8/5</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FiClock} mr={1} />
                <Text>2h 56m</Text>
              </Flex>
              <Text bg="gray.700" px={2} py={1} rounded="md" fontSize="sm">
                Action/Crime
              </Text>
            </Flex>
            <Text fontSize="lg">
              When a sadistic serial killer begins murdering key political
              figures in Gotham, Batman is forced to investigate the city's
              hidden corruption.
            </Text>
            <Flex gap={4}>
              <Button leftIcon={<FiPlay />} colorScheme="red" size="lg">
                Book Now
              </Button>
              <Button
                leftIcon={<FiInfo />}
                variant="outline"
                colorScheme="whiteAlpha"
                size="lg"
              >
                More Info
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Box>

      <Box py={16} px={{ base: 4, md: 8, lg: 32 }}>
        <Flex justify="space-between" align="center" mb={10}>
          <Heading as="h2" size="2xl">
            Featured Movies
          </Heading>
          <Button variant="outline" colorScheme="whiteAlpha">
            View All
          </Button>
        </Flex>
        <Flex wrap="wrap" gap={8}>
          {featuredMovies.map((movie) => (
            <Box
              key={movie.id}
              w={{ base: "100%", md: "calc(33.33% - 16px)" }}
              position="relative"
              overflow="hidden"
              rounded="lg"
            >
              <Image
                src={movie.image}
                alt={movie.title}
                w="full"
                transition="transform 0.5s"
                _groupHover={{ transform: "scale(1.05)" }}
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                bgGradient="linear(to-t, black, transparent)"
                opacity={0.9}
              />
              <Box position="absolute" bottom="0" left="0" p={6} w="full">
                <Heading as="h3" size="lg" mb={1}>
                  {movie.title}
                </Heading>
                <Flex align="center" gap={4} mb={2} fontSize="sm">
                  <Flex align="center">
                    <Icon as={FiStar} color="yellow.400" mr={1} />
                    {movie.rating}
                  </Flex>
                  <Flex align="center">
                    <Icon as={FiClock} mr={1} />
                    {movie.duration}
                  </Flex>
                  <Text bg="gray.700" px={2} py={1} rounded="md">
                    {movie.genre}
                  </Text>
                </Flex>
                <Button colorScheme="red" size="sm" w="full">
                  Book Tickets
                </Button>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      <Box py={16} px={{ base: 4, md: 8, lg: 32 }} bg="gray.800">
        <Flex justify="space-between" align="center" mb={10}>
          <Heading as="h2" size="2xl">
            Now Showing
          </Heading>
          <Button variant="outline" colorScheme="whiteAlpha">
            View All
          </Button>
        </Flex>
        <Flex wrap="wrap" gap={6}>
          {nowShowing.map((movie) => (
            <Box
              key={movie.id}
              w={{ base: "calc(50% - 12px)", md: "calc(25% - 12px)" }}
              position="relative"
            >
              <Box position="relative" overflow="hidden" rounded="lg" mb={3}>
                <Image
                  src={movie.image}
                  alt={movie.title}
                  w="full"
                  transition="transform 0.3s"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="full"
                  h="full"
                  bg="blackAlpha.500"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.3s"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button colorScheme="red" size="sm">
                    Book Now
                  </Button>
                </Box>
              </Box>
              <Heading as="h3" size="md">
                {movie.title}
              </Heading>
              <Text fontSize="sm" color="gray.400">
                {movie.genre}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* <Box py={16} px={{ base: 4, md: 8, lg: 32 }}>
        <Heading as="h2" size="2xl" mb={10}>Coming Soon</Heading>
        <Flex overflowX="auto" pb={6} gap={6}>
          {[1, 2, 3, 4, 5].map(item => (
            <Box key={item} w="48px" flexShrink={0} bg="gray.800" rounded="lg" p={4} textAlign="center">
              <Icon as={FiCalendar} color="red.600" boxSize={10} mb={3} />
              <Text fontWeight="semibold">May {15 + item}</Text>
              <Text fontSize="sm" color="gray.400">New Releases</Text>
            </Box>
          ))}
        </Flex>
      </Box> */}

      <Box py={16} px={{ base: 4, md: 8, lg: 32 }}>
        <Heading as="h2" size="2xl" mb={10}>
          Coming Soon
        </Heading>
        <Flex overflowX="auto" pb={6} gap={6}>
          {[
            { date: 16, label: "New Releases" },
            { date: 17, label: "New Releases" },
            { date: 18, label: "New Releases" },
            { date: 19, label: "New Releases" },
            { date: 20, label: "One Release" },
          ].map((item, index) => (
            <Box
              key={index}
              minW="120px"
              flexShrink={0}
              bg="gray.800"
              rounded="lg"
              p={4}
              textAlign="center"
            >
              <Icon as={FiCalendar} color="red.600" boxSize={6} mb={2} />
              <Text fontWeight="semibold">May {item.date}</Text>
              <Text fontSize="sm" color="gray.400">
                {item.label}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      <Box
        py={20}
        px={{ base: 4, md: 8, lg: 32 }}
        bg="red.600"
        textAlign="center"
      >
        <Heading as="h2" size={{ base: "2xl", md: "3xl" }} mb={6}>
          Never Miss a Movie Again
        </Heading>
        <Text fontSize="xl" mb={8} maxW="3xl" mx="auto">
          Sign up to get notifications about new releases, special offers, and
          exclusive content.
        </Text>
        <Flex
          direction={{ base: "column", sm: "row" }}
          maxW="md"
          mx="auto"
          gap={3}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 rounded text-gray-900 flex-grow"
          />
          <Button colorScheme="blackAlpha" size="lg">
            Subscribe
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Home;
