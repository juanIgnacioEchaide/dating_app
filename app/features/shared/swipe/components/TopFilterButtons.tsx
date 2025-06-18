import { View, StyleSheet } from "react-native";
import FilterButton, { LabelType } from "./FilterButton";

export type FilterButton = { label: string, type: string, selected: boolean, param: string, }

export default function TopFilterButtons({ isTopCard, selected, setSelected }: {
    isTopCard: boolean,
    selected: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>
}) {

    const FILTER_BUTTONS = [
        {
            label: "Amistad",
            selected: false,
            param: '',
            type: 'friendship'
        },
        {
            label: "Citas",
            selected: false,
            param: '',
            type: 'dating'
        },
        {
            label: "Relación",
            selected: false,
            param: '',
            type: ''
        },
    ]

    return <View style={styles.topButtons}>
            {FILTER_BUTTONS.map((filterButton: FilterButton, idx: number) =>
                <FilterButton
                    key={filterButton.label}
                    label={filterButton.label as LabelType}
                    selected={selected === idx}
                    onPress={() => setSelected(idx)} />)}
            </View>
}

const styles = StyleSheet.create({
    topButtons: {
        flexDirection: "row",
        justifyContent: "center",
        top: 50,
        zIndex: 100,
    },
});
