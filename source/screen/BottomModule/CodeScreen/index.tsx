import { SafeAreaView, View } from 'react-native'
import React, { useEffect } from 'react'
import { style } from './style'
import viewModel from './viewModel'
import CodeCmp from '../../../components/CodeCmp'
import { NavigationHeader } from '../../../components/AppThemeHeaderComponent/navigationHeader'
import { Strings } from '../../../utils/strings'
import { useAppSelector } from '../../../redux'
import { GlobalStyle } from '../../../utils/GlobalStyle'

const CodeScreen = () => {

    const { data, onChange, values, createAList } = viewModel();
    const { elapsed } = useAppSelector((state) => state.authReducer);

    useEffect(() => {
        createAList()
    }, [])


    return (
        <View style={GlobalStyle.mainContainer}>
            <NavigationHeader containerStyle={style.headerContainer} centerText={Strings.CodesParking} elapsedTime={elapsed} />
            {values.arryList &&
                values.arryList.map((item: any, index: any) => {
                    return (
                        <CodeCmp key={index} label={item.label}
                            number={item}
                            onPressNumberBox={(data: any, id: any) => {
                                const tempArry = [...values.arryList];
                                const newArray = tempArry.map((element: any, index: number) => {
                                    if (index === id) {
                                        const newNumberArray = element.number.map((numItem: any) => ({
                                            ...numItem,
                                            isCheck: data.key === numItem.key && !numItem.isCheck,
                                        }));

                                        return {
                                            ...element,
                                            number: newNumberArray,
                                        };
                                    }
                                    return element;
                                });
                                onChange(newArray, "arryList");
                            }}
                        />
                    )
                })
            }

        </View>
    )
}

export default CodeScreen

