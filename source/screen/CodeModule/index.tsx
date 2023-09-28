import { StyleSheet, Text, View, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
import { style } from './style'
import CodeCmp from '../../components/CodeCmp'
import viewModel from './viewModel'

const CodeScreen = () => {
    const { data, onChange, values, createAList } = viewModel();

    useEffect(() => {
        createAList()
    }, [])


    return (
        <SafeAreaView style={style.mainView}>
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

        </SafeAreaView>
    )
}

export default CodeScreen

