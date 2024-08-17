import React, { useEffect, useState } from "react";

export default function Map({ filteredData, onMarkerClick }) {
  const [position, setPosition] = useState({
    center: {
      lat: 33.487131, // Default latitude
      lng: 126.5316927, // Default longitude
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({
            center: {
              lat: latitude,
              lng: longitude,
            },
            errMsg: null,
            isLoading: false,
          });
        },
        (err) => {
          setPosition({
            ...position,
            errMsg: err.message,
            isLoading: false,
          });
        }
      );
    } else {
      setPosition({
        ...position,
        errMsg: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    if (!position.isLoading) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6022b3ea363825dba0253bc58c3f328c&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(
              position.center.lat,
              position.center.lng
            ),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(
            position.center.lat,
            position.center.lng
          );

          const icon = new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            new window.kakao.maps.Size(30, 35),
            {
              offset: new window.kakao.maps.Point(16, 34),
              alt: "현재 위치 마커",
              shape: "poly",
              coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33",
            }
          );

          const myPositionMarker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: icon,
          });

          myPositionMarker.setMap(map);

          filteredData.forEach((item) => {
            const storeMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                item.latitude,
                item.longitude
              ),
            });
            storeMarker.setMap(map);

            window.kakao.maps.event.addListener(storeMarker, "click", () => {
              onMarkerClick(item);
            });
          });
        }
      };
    }
  }, [position, filteredData, onMarkerClick]);

  if (position.isLoading) {
    return <div>Loading map...</div>;
  }

  if (position.errMsg) {
    return <div>Error: {position.errMsg}</div>;
  }

  return <div id="map" style={{ width: "100%", height: "650px" }}></div>;
}
