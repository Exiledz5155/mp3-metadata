import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { update_metadata } from "./fileEditing"; //Adjust the path as needed

export function UploadBox() {
  // Might need to look into dark/light mode for this css
  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#c7c7c7",
    borderStyle: "dashed",
    backgroundColor: "#daffe4",
    color: "#bdbdbd",
    transition: "border .3s ease-in-out",
    height: 100,
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  // NOT SURE WHAT THIS DOES
  //   Code from https://react-dropzone.js.org/#section-basic-example
  //   https://www.digitalocean.com/community/tutorials/react-react-dropzone
  // const onDrop = useCallback((acceptedFiles: any[]) => {
  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onabort = () => console.log("file reading was aborted");
  //     reader.onerror = () => console.log("file reading has failed");
  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result;
  //       console.log(binaryStr);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
  
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        const binaryStr = reader.result;
  
        // Call the update_metadata function with the binary data and metadata tags
        const tags = {
          title: "New Title",
          artist: "New Artist",
          album: "New Album",
          APIC: "./example/cover.jpg",
          TRCK: "27"
        };
  
        const success = await update_metadata(tags, binaryStr);
        if (success) {
          console.log('Metadata successfully updated.');
        } else {
          console.log('Failed to update.');
        }
      };
  
      reader.readAsArrayBuffer(file);
    });
  }, []);
  

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {/* TODO: FIX TEXT EXTENDING OUTSIDE UPLOAD BOX BORDER ON MOBILE */}
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
}
