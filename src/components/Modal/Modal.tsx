import React, {useState, useEffect} from 'react'
import "leaflet/dist/leaflet.css";
import "./index.scss";
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";

interface ModalProps {
    visible: boolean;
    productData:any;
    setVisible(closeModal: boolean): void;
}
const Modal: React.FunctionComponent<ModalProps> = ({
    visible,
    setVisible,
    productData
}: ModalProps) => {

  const [value, setValue] = useState<number>(1);
  const [images, setImages] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let array:any = []
    if(productData.image !== undefined){
      productData?.image.forEach((images:string, i: number) => {
        array.push({
          itemImageSrc: images,
          alt: `imagen-${i}`
        })
      });
      setImages(array)
    }
  }, [visible]);

  const itemTemplate = (item: any) => {
      return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  };

  const resize = (coords: any) => {
    return (
      <MapContainer center={coords} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}></Marker>
      </MapContainer>
    );
  };

  const footerContent = (
    <div>
      <div className="uey_modal--container-info-buy">
        <button>Añadir al Carrito</button>
      </div>
    </div>
  );

  return (
    <Dialog header={productData?.name} visible={visible} onHide={() => setVisible(false)}footer={footerContent}>
        <div className="uey_modal--container">
          <div className="uey_modal--container-gallery">
            <Galleria value={images} style={{ maxWidth: '300px' }} showThumbnails={false} showIndicators={images.length > 1 ? true : false} item={itemTemplate} />
          </div>
          <div className="uey_modal--container-info">
            <span><b>Nombre del producto:</b> {productData?.name}</span>
            <span><b>Precio:</b> {`$${Number.parseFloat(productData?.price)}`}</span>
            {productData.type === "sell_pr" ? (
              <>  
                <span className={`${productData?.inventory < 10 && productData?.inventory !== null ? 'red-color' : ''}`}><b>Stock: </b>{productData?.inventory}</span>
              </>
            ): (
              <>  
                <span><b>Tipo de Renta: </b>{productData?.type_rent === "per_hour" ? "Por Hora" : "Por Noche"}</span>
                {
                  productData.type_rent === "per_night" && <span><b>Direccion: </b>{productData?.address}</span>
                }
              </>
            )}
            <hr />
            <span><b>Nombre del Vendedor:</b> {productData?.seller?.name}</span>
            <span><b>Telefono del Vendedor:</b> {productData?.seller?.phone}</span>
            <hr />
            {productData.type === "sell_pr" ? (
              <>  
                <span><b>Agregar Cantidad:</b></span>
                <InputNumber value={value} onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value || 0)} min={0} max={20} showButtons/>
              </>
            ): (
              <>  
                {
                  productData.type_rent === "per_night" && <div>{resize(productData?.coords)}</div>
                }
                <span><b>Este producto solo se renta {productData?.type_rent === "per_hour" ? "por Hora" : "por Noche"} porfavor escoja su reserva abajo</b></span>
                {productData.type_rent === "per_hour" ? (
                  <Calendar value={date} onChange={(e:any) => setDate(e.value)} showTime hourFormat="12" />
                ): (
                  <Calendar value={date} onChange={(e:any) => setDate(e.value)} />
                )}
              </>
            )}
          </div>
        </div>
    </Dialog>
  )
}

export default Modal;