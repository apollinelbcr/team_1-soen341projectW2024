import Swal from "sweetalert2";

export function multiplySvgPoints(pointsString: string, iconSize: number, width: number, height: number) {
  const iconMaxSize = Math.min(width, height) * 0.5;
  const scale = iconMaxSize / iconSize;
  // eslint-disable-next-line
  return pointsString.replace(/([0-9,\.]{1,})/g, (coords) => {
    // eslint-disable-next-line
    coords = coords.split(',').map((p) => parseFloat(p));
    const x = coords[0] * scale + width / 2 - (iconSize * scale) / 2;
    const y = coords[1] * scale + height / 2 - (iconSize * scale) / 2;
    if (iconMaxSize >= 100) {
      return `${Math.round(x)},${Math.round(y)}`;
    }
    return `${x},${y}`;
  });
}

export function showAlert(title, text, icon, confirmButtonText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: '#3085d6'
  });
}

export function generateUUID() {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && (performance.now()*1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if(d > 0){ //Use timestamp until depleted
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else { //Use microseconds since page-load if supported
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}