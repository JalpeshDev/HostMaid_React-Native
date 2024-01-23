import { SafeAreaView, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { style } from './style'
import viewModel from './viewModel'
import CodeCmp from '../../../components/CodeCmp'
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader'
import { Strings } from '../../../utils/strings'
import { useAppSelector } from '../../../redux'
import { GlobalStyle } from '../../../utils/GlobalStyle'
import colors from '../../../utils/colors'
import PlatformType from '../../../utils/PlatformType'

const CodeScreen = () => {
    const { loading, bookingDetails } = useAppSelector((state: any) => state.bookingReducer);

    const { data1, onChange, values, createAList } = viewModel();
    const { elapsed } = useAppSelector((state) => state.authReducer);
    useEffect(() => {
        createAList(bookingDetails?.property)
    }, [])


    console.log("values-->", values.arryList);
    // console.log("da-->", data1);



    return (
        <View style={GlobalStyle.mainContainer}>
            {PlatformType.android &&
                <StatusBar
                    animated
                    translucent={false}
                    backgroundColor={colors.themeGreen}
                />
            }
            <NavigationHeader isTitle={true} containerStyle={style.headerContainer}
                leftTitle={Strings.CodesParking} elapsedTime={elapsed} />
            {/* {resultArray &&
                resultArray.map((item: any, index: any) => {
                    return (
                        <CodeCmp key={index} label={item}
                            number={item}
                            onPressNumberBox={(data: any, id: any) => {

                            }}
                        />
                    )
                })
            } */}
            {values.arryList &&
                values.arryList.map((item: any, index: any) => {
                    return (
                        <CodeCmp key={index} label={item.label}
                            number={item}
                        // onPressNumberBox={(data: any, id: any) => {
                        //     const tempArry = [...values.arryList];
                        //     const newArray = tempArry.map((element: any, index: number) => {
                        //         if (index === id) {
                        //             const newNumberArray = element.number.map((numItem: any) => ({
                        //                 ...numItem,
                        //                 isCheck: data.key === numItem.key && !numItem.isCheck,
                        //             }));

                        //             return {
                        //                 ...element,
                        //                 number: newNumberArray,
                        //             };
                        //         }
                        //         return element;
                        //     });
                        //     onChange(newArray, "arryList");
                        // }}
                        />
                    )
                })
            }

        </View>
    )
}

export default CodeScreen

