import sheenchair from "../assets/models/sheenchair.glb";
import ioschair from "../assets/models/sheenchair.usdz";
import painting from "../assets/models/Painting.glb";
import iospainting from "../assets/models/Painting.usdz";
import car from "../assets/models/car.glb";
import ioscar from "../assets/models/car.usdz";
import car1 from "../assets/models/Car1.glb";
import ioscar1 from "../assets/models/Car1.usdz";
import OfficeChair from "../assets/models/OfficeChair.glb";
import OfficeChairUsdz from "../assets/models/OfficeChair.usdz";
import pot from "../assets/models/pot.glb";
import potUsdz from "../assets/models/pot.usdz";

const productItems = [
  {
    id: 1,
    name: "Sheen Chair",
    modelSrc: sheenchair,
    iOSSrc: ioschair,
    category: "Bedroom",
    color: "Orange",
    price: 2500, // Added price in INR
    annotations: [
      {
        title: "comfortable-back",
        slot: "hotspot-1",
        position: "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "comfortable-seat",
        slot: "hotspot-2",
        position: "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal: "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 2,
    name: "Office Chair",
    modelSrc: OfficeChair,
    iOSSrc: OfficeChairUsdz,
    category: "Office",
    color: "Black",
    price: 3500, // Added price in INR
    annotations: [
      {
        title: "comfortable-back",
        slot: "hotspot-1",
        position: "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "comfortable-seat",
        slot: "hotspot-2",
        position: "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal: "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 3,
    name: "Pot",
    modelSrc: pot,
    iOSSrc: potUsdz,
    category: "Decor",
    color: "Red",
    price: 1000, // Added price in INR
    annotations: [
      {
        title: "pot-structure",
        slot: "hotspot-1",
        position: "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal: "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 4,
    name: "Painting",
    modelSrc: painting,
    iOSSrc: iospainting,
    category: "Living Room",
    color: "Brown",
    price: 2000, // Added price in INR
    annotations: [
      {
        title: "wooden-frame",
        slot: "hotspot-1",
        position: "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "pure-canvas",
        slot: "hotspot-2",
        position: "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal: "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 5,
    name: "Car",
    modelSrc: car,
    iOSSrc: ioscar,
    category: "Bedroom",
    color: "Blue",
    price: 5000, // Added price in INR
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position: "-0.0036662781627494825m 0.11165170707633758m 0.07931578568217246m",
        normal: "-0.007882343763611447m 0.9530143214961644m 0.30282267365571863m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position: "-0.09202904871903242m 0.05133736629679797m 0.0013477452825590153m",
        normal: "-0.9976942525197127m 0.061837681663106964m 0.027969261979253417m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 6,
    name: "Sport Car",
    modelSrc: car1,
    iOSSrc: ioscar1,
    category: "Living Room",
    color: "Red",
    price: 7500, // Added price in INR
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position: "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position: "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal: "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
];

export default productItems;
