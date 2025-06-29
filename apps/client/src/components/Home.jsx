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
        "https://res.cloudinary.com/nil2022/image/upload/v1751172933/dune_part_two_ver3_xxlg_yjqxly.jpg",
      releaseDate: "2024-03-01",
      mpaaRating: "PG-13",
      boxOffice: "$714,444,000",
    },
    {
      id: 2,
      title: "The Batman",
      genre: "Action/Crime",
      rating: 4.5,
      duration: "2h 56m",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751173118/batman_ver7_xxlg_mnn1h5.jpg",
      releaseDate: "2022-03-04",
      mpaaRating: "PG-13",
      boxOffice: "$772,245,583",
    },
    {
      id: 3,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi/Adventure",
      rating: 4.3,
      duration: "3h 12m",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751172854/avatar_the_way_of_water_ver4_xxlg_xt3ea5.jpg",
      releaseDate: "2022-12-16",
      mpaaRating: "PG-13",
      boxOffice: "$2,320,250,281",
    },
  ];

  const nowShowing = [
    {
      id: 4,
      title: "Black Panther: Wakanda Forever",
      genre: "Action/Adventure",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751173551/black_panther_wakanda_forever_ver2_xxlg_vtbeth.jpg",
      releaseDate: "2022-11-11",
      rating: "PG-13",
      runtime: "2h 41m",
      boxOffice: "$859,208,836",
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      genre: "Action/Drama",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751173624/top_gun_maverick_ver3_xxlg_hdeaxr.jpg",
      releaseDate: "2022-05-27",
      rating: "PG-13",
      runtime: "2h 11m",
      boxOffice: "$1,495,696,292",
    },
    {
      id: 6,
      title: "Jurassic World Dominion",
      genre: "Action/Adventure",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751173714/jurassic_world_dominion_ver6_xxlg_dmqbef.jpg",
      releaseDate: "2022-06-10",
      rating: "PG-13",
      runtime: "2h 27m",
      boxOffice: "$1,001,978,080",
    },
    {
      id: 7,
      title: "Doctor Strange in the Multiverse of Madness",
      genre: "Action/Fantasy",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751143942/MV5BN2YxZGRjMzYtZjE1ZC00MDI0LThjZmQtZTZmMzVmMmQ2NzBmXkEyXkFqcGc_._V1_FMjpg_UY2500__pawnkb.jpg",
      releaseDate: "2022-05-06",
      rating: "PG-13",
      runtime: "2h 6m",
      boxOffice: "$955,775,804",
    },
    {
      id: 8,
      title: "How to Train Your Dragon",
      genre: "Animation/Adventure",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751178135/how_to_train_your_dragon_ver2_xxlg_hehv84.jpg",
      releaseDate: "2025-06-13",
      rating: "PG",
      runtime: "2h 15m",
      boxOffice: "$84,630,000",
    },
    {
      id: 9,
      title: "28 Years Later",
      genre: "Horror/Sci-Fi",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751178225/twenty_eight_years_later_xxlg_ha83y7.jpg",
      releaseDate: "2025-06-20",
      rating: "R",
      runtime: "1h 59m",
      boxOffice: "$30,000,000",
    },
    {
      id: 10,
      title: "F1: The Movie",
      genre: "Action/Drama",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751178273/f_one_xxlg_jkfbo3.jpg",
      releaseDate: "2025-06-27",
      rating: "PG-13",
      runtime: "2h 0m",
      boxOffice: "$50,000,000",
    },
    {
      id: 11,
      title: "A Minecraft Movie",
      genre: "Adventure/Fantasy",
      image:
        "https://res.cloudinary.com/nil2022/image/upload/v1751178325/minecraft_the_movie_ver3_xxlg_gou3io.jpg",
      releaseDate: "2025-04-04",
      rating: "PG",
      runtime: "1h 42m",
      boxOffice: "$100,000,000",
    },
  ];

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Box position="relative" h="100vh">
        {/* Background Image - this should be first */}
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
        {/* Overlay - this should be second (on top of the image) */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="blackAlpha.700" // Increased opacity for better visibility
        />
        {/* Content - this remains on top of everything */}
        <Box
          position="relative" // Keep this relative so its content is above the absolute elements
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

        {/* HERO Section */}
        <Flex wrap="wrap" gap={8} justify="space-between">
          {featuredMovies.map((movie) => (
            <Box
              key={movie.id}
              flex="1 1 30%"
              minW={{ base: "100%", lg: "30%" }}
              maxW={{ base: "100%", lg: "32%" }}
              position="relative"
              overflow="hidden"
              rounded="lg"
              shadow="md"
              transition="transform 0.5s"
              _hover={{ transform: "scale(1.05)" }}
              cursor="pointer"
              _groupHover={{ transform: "scale(1.05)" }}
              display="flex"
              flexDirection="column"
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

        {/* NOW SHOWING Section */}
        <Flex wrap="wrap" gap={6} justify="flex-start">
          {nowShowing.map((movie) => (
            <Box
              key={movie.id}
              // --- MODIFIED WIDTH PROPERTY HERE ---
              // On base (mobile), take full width
              // On md (medium screens), take slightly less than 1/3 to accommodate the gap
              // On lg (large screens and up), take slightly less than 1/3
              w={{
                base: "100%",
                md: "calc(33.33% - 16px)",
                lg: "calc(33.33% - 16px)",
              }}
              // --- END MODIFIED WIDTH PROPERTY ---
              position="relative"
              overflow="hidden"
              rounded="lg"
              shadow="md"
              transition="transform 0.5s"
              _hover={{ transform: "scale(1.05)" }}
              cursor="pointer"
              role="group"
              display="flex"
              flexDirection="column"
            >
              <Box position="relative" overflow="hidden" rounded="lg" mb={2}>
                <Image
                  src={movie.image}
                  alt={movie.title}
                  w="full"
                  h={{ base: "full", md: "400px", lg: "500px" }}
                  objectFit="cover"
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
