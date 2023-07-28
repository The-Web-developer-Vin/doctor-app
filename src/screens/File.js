
import React, { useState, useCallback, useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image } from "react-native";
import DocumentPicker from "react-native-document-picker";

import NativeUploady, {
    useItemFinishListener,
} from "@rpldy/native-uploady";

export default function File() {
    const [uploadUrl, setUploadUrl] = useState(false);
    // useItemFinishListener((item) => {
    //     const response = JSON.parse(item.uploadResponse.data);
    //     console.log(`item ${item.id} finished uploading, response was: `, response);
    //     setUploadUrl(response.url);
    //   });
    

    const pickFile = useCallback(async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled the picker, exit any dialogs or menus and move on");
            } else {
                throw err;
            }
        }
    }, []);

    return (
       
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.body}>
                        <Text style={styles.sectionTitle}>Upload File</Text>
                    </View>
                    <View>
                        <Button title="Choose File" onPress={pickFile} />
                        {uploadUrl && <Image source={{ uri: uploadUrl }}  />}
                    </View>
                </ScrollView>
            </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        height: "100%",
        padding: 50,
        marginTop: 100
    },
    uploadedImage:{
        height:400

    }
})