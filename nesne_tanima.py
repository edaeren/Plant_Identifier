# -*- coding: utf-8 -*-
"""
Created on Sun Oct 29 15:24:04 2023

@author: edaer
"""

import cv2
import numpy as np

img = cv2.imread("C:/Users/edaer/PythonNesneTanima/people3.jpg")
#print (img)

img_width=img.shape[1]
img_height=img.shape[0]

img_blob=cv2.dnn.blobFromImage(img,1/255,(416,416), swapRB=True)
labels=["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat",
          "trafficlight", "firehydrant", "stopsign", "parkingmeter", "bench", "bird", "cat",
          "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack",
          "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sportsball",
          "kite", "baseballbat", "baseballglove", "skateboard", "surfboard", "tennisracket",
          "bottle", "wineglass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
          "sandwich", "orange", "broccoli", "carrot", "hotdog", "pizza", "donut", "cake", "chair",
          "sofa", "pottedplant", "bed", "diningtable", "toilet", "tvmonitor", "laptop", "mouse",
          "remote", "keyboard", "cellphone", "microwave", "oven", "toaster", "sink", "refrigerator",
          "book", "clock", "vase", "scissors", "teddybear", "hairdrier", "toothbrush"]

colors=["255,255,0","0,255,0","255,0,255","0,255,255","0,0,255"]
colors=[np.array(color.split(",")).astype("int") for color in colors]
colors=np.array(colors)
colors=np.tile(colors,(20,1)) #colors'ı çoğalttık yana ve asagi

model=cv2.dnn.readNetFromDarknet("C:/Users/edaer/PythonNesneTanima/model/yolov3.cfg","C:/Users/edaer/PythonNesneTanima/model/yolov3.weights")
layers =model.getLayerNames()
output_layer= [ layers[layer-1] for layer in model.getUnconnectedOutLayers() ]

model.setInput(img_blob)

detection_layers=model.forward(output_layer)


ids_list=[]
boxes_list=[]
confidence_list=[]



for detection_layer in detection_layers:
    for object_detection in detection_layer:
        scores= object_detection [5:]
        predicted_id=np.argmax(scores)
        confidence= scores[predicted_id] #guven score'u. scoreları tek tek atıyoruz
        
        #guven araligi olusturuyoruz
        #guven araligi %30dan fazla ise ciz.
        if confidence >0.30  :
            label=labels [predicted_id]
            bounding_box=object_detection[0:4] * np.array ([img_width,img_height,img_width,img_height])
            (box_center_x,box_center_y,box_width,box_height)=bounding_box.astype("int")
            
            #kutularin boyutlarini olusturuyoruz
            start_x= int(box_center_x-(box_width/2))
            start_y= int(box_center_y- (box_height/2))
            
            
            ids_list.append(predicted_id)
            confidence_list.append(float(confidence))
            boxes_list.append([start_x,start_y,int(box_width),int(box_height)])
            
            #0.5 ve 0.4 guven degerleri, bunlari kodda degistirerek kendince optimize edebilirsin.
max_ids=cv2.dnn.NMSBoxes(boxes_list,confidence_list,0.5,0.4)
            
            
            #id'lerin maxlarin ve guven_id'lerin tutuldugu degiskenler var
            #daha sonra for dongusu icinde onceden belirlenen bu degiskenleri bu dizilerin icine yolladik
            #sonra fordan cikarak buldugumuz max guvenilirlige sahip maxlari, max_id'sinin icine sakladik.
            #aldigimiz her bir degeri max class_id'si icinde tuttuk.
            #tuttugumuz max degerleri de label=labels[predicted_id] kisminda geri cektik ve bunlari kaydettik.
            
for max_id in max_ids:
    max_class_id=max_id
    box=boxes_list[max_class_id]
                
    start_x=box[0]
    start_y=box[1]
    box_width=box[2]
    box_height=box[3]
                
    #buldugu guven degerlerini (predict_id)) atiycaz.
    predicted_id=ids_list[max_class_id]
    label=labels[predicted_id]
    confidence=confidence_list[max_class_id]
            
            
    end_x=start_x+box_width
    end_y=start_y+box_height
            
    #kutularin renklerini olusturuyoruz
    box_color=colors[predicted_id]
    box_color=[int(each) for each in box_color]
        
    #kutulari ciziyoruz
            
    cv2.rectangle(img,(start_x,start_y),(end_x,end_y),box_color,2)
            
    #kutu uzerine isim
    cv2.putText(img,label,(start_x,start_y-20),cv2.FONT_HERSHEY_SIMPLEX,0.5,box_color,1) #en sondaki yazi kalinligi
while(1):
    cv2.imshow("Tespit Ekrani",img)
    k=cv2.waitKey(5) & 0xFF
    if k== 27:
        break
    
cv2.destroyAllWindows()
        
        
        
        
        
        
        
 