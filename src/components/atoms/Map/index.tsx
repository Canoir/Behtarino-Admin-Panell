import 'leaflet/dist/leaflet.css';

import {
  AttributionControl,
  Circle,
  MapContainer,
  MapContainerProps,
  Marker,
  MarkerProps,
  TileLayer
} from 'react-leaflet';
import { Map as LeafletMap, divIcon } from 'leaflet';

import Box from '@mui/material/Box';
import { CoordinateType } from '@typings/Map';
import { DEFAULT_COORDS } from '@constants/map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { RefObject } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import useTheme from '@mui/material/styles/useTheme';

const Map = (
  props: Omit<MapContainerProps, 'center'> & {
    center: CoordinateType;
    markers?: ({ position: CoordinateType } & Omit<MarkerProps, 'position'>)[];
    editMode?: boolean;
    mapRef?: RefObject<LeafletMap>;
    circleRadius?: number;
  }
) => {
  const { markers, center, mapRef, editMode, circleRadius, ...containerProps } = props || {};
  const theme = useTheme();

  return (
    <Box position="relative" sx={containerProps.style}>
      <MapContainer
        ref={mapRef}
        zoom={13}
        center={[
          Number(center[0]) || DEFAULT_COORDS.LATITUDE,
          Number(center[1]) || DEFAULT_COORDS.LONGITUDE
        ]}
        attributionControl={false}
        zoomControl={false}
        {...containerProps}>
        <TileLayer
          attribution={`تمام حقوق حفظ شده و متعلق به بهترینو می باشد`}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AttributionControl position="bottomright" prefix="" />

        {circleRadius ? (
          <Circle
            center={[
              Number(center[0]) || DEFAULT_COORDS.LATITUDE,
              Number(center[1]) || DEFAULT_COORDS.LONGITUDE
            ]}
            fillColor={theme.palette.primary.main}
            radius={circleRadius || 2000}
          />
        ) : null}

        {markers
          ?.filter(({ position }) => position[0] && position[1])
          ?.map(({ position, ...marker }, index) => (
            <Marker
              key={index}
              {...marker}
              position={[Number(position[0]), Number(position[1])]}
              icon={divIcon({
                html: renderToStaticMarkup(
                  <LocationOnIcon fontSize="large" style={{ fill: theme.palette.primary.main }} />
                ),
                iconSize: [24, 24]
              })}
            />
          ))}
      </MapContainer>
      {editMode ? (
        <LocationOnIcon
          sx={{
            zIndex: 401,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            m: 'auto'
          }}
        />
      ) : null}
    </Box>
  );
};

export default Map;
