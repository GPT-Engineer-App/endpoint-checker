import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Textarea, VStack, Code, useToast } from "@chakra-ui/react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "GET" ? null : body,
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" mb={8}>
        Endpoint Tester
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>URL</FormLabel>
            <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Method</FormLabel>
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </Select>
          </FormControl>
          {method !== "GET" && (
            <FormControl>
              <FormLabel>Body</FormLabel>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </FormControl>
          )}
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Send
          </Button>
        </VStack>
      </form>
      {response && (
        <Box mt={8}>
          <Heading as="h2" size="md" mb={4}>
            Response
          </Heading>
          <Code display="block" whiteSpace="pre" p={4}>
            {JSON.stringify(response, null, 2)}
          </Code>
        </Box>
      )}
    </Box>
  );
};

export default Index;
