import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Grid,
  Text,
  Textarea,
  Radio,
  RadioGroup,
  Switch,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app, storage } from "../firebase/firebase";
import axios from "axios";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
const initialFormData = {
  heading: "",
  subHeading: "",
  author: "",
  trending: false,
  numberOfClick: 0,
  catagory: [],
  article: "",
  imgs: [],
  thumbnail: null,
  breakingL: false,
};

function UpdateNewsModal({ id, fetchData }) {
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [imgArticle, setImgArticle] = useState([]);
  const { user } = useSelector((el) => {
    return el.auth;
  });
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: [files],
      });
    }
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const getSingleData = () => {
    axios.get(`https://surtiesserver.onrender.com/news/${id}`).then((res) => {
      setFormData(res.data);
      console.log(res.data);
      setImgArticle(res.data.imgs);
    });
  };

  const handleChangeImg1 = async () => {
    const file = thumbnail;

    setUploading1(true);
    if (file === null) return;
    const imgRef = ref(storage, `images/${file.name + Date.now()}`);
    try {
      const snapshot = await uploadBytes(imgRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData({
        ...formData,
        thumbnail: downloadURL,
      });

      setUploading1(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading1(false);
    }
  };
  const handleChangeImg2 = async () => {
    setUploading2(true);
    const array = [];

    for (var i = 0; i < files.length; i++) {
      array.push(storeImg(files[i]));
    }
    Promise.all(array).then((urls) => {
      const objs = urls.map((url) => ({ img: url, content: "" }));
      setImgArticle(imgArticle.concat(objs));
      setUploading2(false);
    });
  };
  const storeImg = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imgArticle);
    const updatedFormData = { ...formData, author: user, imgs: imgArticle };
    setFormData(updatedFormData);
    axios
      .patch(
        `${"https://surtiesserver.onrender.com/news"}/${id}`,
        updatedFormData
      )
      .then((response) => {
        fetchData();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating resource:", error);
      });
    onClose();
  };
  const handleDelete = () => {
    setFormData({ ...formData, thumbnail: null });
  };
  const handleDelete1 = (el) => {
    const newData = imgArticle.filter((element) => {
      return element.img !== el;
    });

    setImgArticle(newData);
  };

  const handleButtonClick = (lable) => {
    setFormData({ ...formData, catagory: lable });
  };
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["images", "link"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "align",
    "size",
    "images",
  ];

  const handleProcedureContentChange = (content) => {
    setFormData({ ...formData, article: content });
  };
  const handleProcedureContentChange2 = (index, newContent) => {
    const updatedImgArticle = [...imgArticle];
    updatedImgArticle[index].content = newContent;
    setImgArticle(updatedImgArticle);
  };
  useEffect(() => {
    getSingleData();
  }, []);
  const handleClick = () => {
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button colorScheme="green" onClick={handleClick}>
        Edit
      </Button>

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"#d91e26"} textColor={"white"}>
            Upadate News
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody display={"flex"} justifyContent={"center"}>
            <Flex>
              <Stack>
                <Box>
                  <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                      <FormLabel>Heading</FormLabel>
                      <Input
                        focusBorderColor="#d91e26"
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Subheading</FormLabel>
                      <Input
                        focusBorderColor="#d91e26"
                        type="text"
                        name="subHeading"
                        value={formData.subHeading}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Box
                      marginTop={"20px"}
                      marginBottom={"60px"}
                      display={"grid"}
                      justifyContent={"center"}
                    >
                      <ReactQuill
                        value={formData.article}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="write your content ...."
                        onChange={handleProcedureContentChange}
                        style={{ height: "220px" }}
                      ></ReactQuill>
                    </Box>{" "}
                    <FormControl mb={4}>
                      <FormLabel>Thumbnail</FormLabel>
                      <Flex gap={"10px"}>
                        <Input
                          focusBorderColor="#d91e26"
                          type="file"
                          name="thumbnail"
                          onChange={(e) => {
                            setThumbnail(e.target.files[0]);
                          }}
                        />
                        <Button
                          isDisabled={thumbnail == null}
                          pos={"static"}
                          loadingText=""
                          bg={"#d91e26"}
                          color={"white"}
                          _hover={{
                            bg: "yellow",
                            color: "#d91e26",
                          }}
                          isLoading={uploading1}
                          onClick={handleChangeImg1}
                          type="button"
                        >
                          Upload
                        </Button>
                      </Flex>
                    </FormControl>
                    <Box>
                      {typeof formData.thumbnail !== "string" ? (
                        <></>
                      ) : (
                        <div>
                          <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={"10px"}
                            flexDirection={"column"}
                          >
                            <img
                              style={{ width: "180px", borderRadius: "10px" }}
                              src={formData.thumbnail}
                              alt=""
                            />
                            <Button
                              onClick={handleDelete}
                              width={"100px"}
                              colorScheme="red"
                              type="button"
                            >
                              Delete
                            </Button>
                          </Flex>
                        </div>
                      )}
                    </Box>
                    <FormControl mb={4}>
                      <FormLabel>Images</FormLabel>
                      <Flex gap={"10px"}>
                        <Input
                          focusBorderColor="#d91e26"
                          multiple="multiple"
                          type="file"
                          name="imgs"
                          onChange={(e) => {
                            setFiles(e.target.files);
                          }}
                        />
                        <Button
                          type="button"
                          pos={"static"}
                          bg={"#d91e26"}
                          color={"white"}
                          _hover={{
                            bg: "yellow",
                            color: "#d91e26",
                          }}
                          isLoading={uploading2}
                          onClick={handleChangeImg2}
                        >
                          Upload
                        </Button>
                      </Flex>
                    </FormControl>
                    <Box>
                      {!imgArticle[0] ? (
                        <></>
                      ) : (
                        <Flex gap={"10px"}>
                          {imgArticle.map((el, index) => {
                            return (
                              <Flex
                                justifyContent={"center"}
                                direction={"column"}
                                alignItems={"center"}
                                gap={"10px"}
                                key={index}
                              >
                                <img
                                  style={{
                                    width: "160px",
                                    borderRadius: "10px",
                                  }}
                                  src={el.img}
                                  alt=""
                                />
                                <Button
                                  type="button"
                                  onClick={() => handleDelete1(el.img)}
                                  width={"100px"}
                                  colorScheme="red"
                                >
                                  Delete
                                </Button>
                                <Flex h={{ base: "334px", md: "" }} mb={4}>
                                  <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    value={el.content}
                                    formats={formats}
                                    placeholder="Write your content ..."
                                    onChange={(newContent) =>
                                      handleProcedureContentChange2(
                                        index,
                                        newContent
                                      )
                                    }
                                    style={{ height: "200px" }}
                                  ></ReactQuill>
                                </Flex>
                              </Flex>
                            );
                          })}
                        </Flex>
                      )}
                    </Box>
                    <Flex mt={"20px"} mb={"20px"} gap={"10px"}>
                      <FormControl columns={{ base: 2, lg: 4 }}>
                        <Flex alignItems={"center"}>
                          <FormLabel fontWeight={"bold"}>
                            Breaking News
                          </FormLabel>
                          <Switch
                            size={"lg"}
                            colorScheme="red"
                            name="breaking"
                            isChecked={formData.breaking}
                            onChange={handleChange}
                            color={"#d91e26"}
                          />
                        </Flex>
                      </FormControl>
                      <FormControl columns={{ base: 2, lg: 4 }}>
                        <Flex alignItems={"center"}>
                          <FormLabel fontWeight={"bold"}>
                            Trending News
                          </FormLabel>
                          <Switch
                            size={"lg"}
                            colorScheme="red"
                            name="trending"
                            isChecked={formData.trending}
                            onChange={handleChange}
                          />
                        </Flex>
                      </FormControl>
                    </Flex>
                    <Box>
                      <FormControl mb={4}>
                        <FormLabel fontWeight={"bold"}>
                          Instagram Link
                        </FormLabel>
                        <Input
                          focusBorderColor="#d91e26"
                          type="text"
                          name="instaLink"
                          value={formData.instaLink}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl marginTop={"10px"} mb={4}>
                        <FormLabel fontWeight={"bold"}>Youtube Link</FormLabel>
                        <Input
                          focusBorderColor="#d91e26"
                          type="text"
                          name="youtubeLink"
                          value={formData.youtubeLink}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl marginTop={"10px"} mb={4}>
                        <FormLabel fontWeight={"bold"}>Facebook Link</FormLabel>
                        <Input
                          focusBorderColor="#d91e26"
                          type="text"
                          name="facebookLink"
                          value={formData.facebookLink}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel fontWeight={"bold"}>Twitter Link</FormLabel>
                        <Input
                          focusBorderColor="#d91e26"
                          type="text"
                          name="twitterLink"
                          value={formData.twitterLink}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormLabel>Catagory</FormLabel>
                      <Grid
                        templateColumns={"repeat(3, 1fr)"}
                        gap={"8px"}
                        mb={4}
                      >
                        {[
                          "country",
                          "gujarat",
                          "surat",
                          "national",
                          "entertainment",
                          "cricket",
                          "religion",
                          "surties",
                        ].map((label, index) => (
                          <Button
                            key={index}
                            _hover={{ border: "1px solid #d91e26" }}
                            fontSize={"14px"}
                            fontWeight={"400"}
                            color={
                              formData.catagory == label ? "white" : "#d91e26"
                            }
                            onClick={() => handleButtonClick(label)}
                            backgroundColor={
                              formData.catagory == label
                                ? "#d91e26"
                                : "transparent"
                            }
                          >
                            <Text textTransform={"capitalize"}> {label}</Text>
                          </Button>
                        ))}
                      </Grid>
                    </Box>
                    <Stack spacing={10} pt={2}>
                      {" "}
                      <Button
                        bg={"#d91e26"}
                        color={"white"}
                        _hover={{
                          bg: "yellow",
                          color: "#d91e26",
                        }}
                        type="submit"
                        mt={4}
                      >
                        Update
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UpdateNewsModal;
