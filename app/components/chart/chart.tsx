import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ClientOnly } from 'remix-utils/client-only';
import { Flex, Loader } from '@mantine/core';
import React from "react";

export default function Chart({ options }: { options: Highcharts.Options }) {
    return (
        <ClientOnly fallback={
            <Flex
                justify="center"
                align="end">
                <Loader size={50} />
            </Flex>}>
            {() => (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}</ClientOnly>
    );
};
