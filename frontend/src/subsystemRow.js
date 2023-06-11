import React from 'react';

class CompactTableRow extends React.Component {
  render() {
    let name = this.props.data.name ? this.props.data.name : this.props.data.type_name;
    let itemid = this.props.data.itemid ? this.props.data.itemid : this.props.data.type_id;
    let jita_profits_with_commas = this.props.data.jita_profits_with_commas
    let jitaBuySellRatio = this.props.data.jitaBuySellRatio.toFixed(2)
    let numberDestroyed = this.props.data.occurrence_count
    const {
      date, 
      jita_buy, 
      jita_sell, 
      amarr_sell_orders, 
      jita_sell_orders,
      jita_sell_volume, 
      amarr_sell_volume, 
      jita_buy_orders,
      jita_buy_volume,
      amarr_buy_orders,
      amarr_buy_volume,
      amarr_buy, 
      amarr_sell, 
      manufacture_cost_jita, 
      manufacture_cost_amarr } = this.props.data;
      //name, profit, buySellRatio, destroyedThisWeek
    return (
      <tr>
        <td><a href = {"/subsystems/" + itemid + "/"}>{name}</a></td>
        <td><a href = {"/subsystems/" + itemid + "/"}>{jita_profits_with_commas} ISK</a></td>
        <td><a href = {"/subsystems/" + itemid + "/"}>{jitaBuySellRatio}</a></td>
        <td><a href = {"/subsystems/" + itemid + "/"}>{numberDestroyed}</a></td>
        {/* <td><a href = {"/subsystems/" + itemid + "/"}>{manufacture_cost_jita} ISK</a></td>
        <td><a href = {"/subsystems/" + itemid + "/"}>{`${jita_sell_volume} Units/ ${jita_sell_orders} Orders`}</a></td>
        <td><a href = {"/subsystems/" + itemid + "/"}>{`${jita_buy_volume} Units/ ${jita_buy_orders} Orders`}</a></td> */}
      </tr>
    );
  }
}

export default CompactTableRow;
