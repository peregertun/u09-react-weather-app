import React from "react";
interface IProps {}

interface IState {
  city: string;
}
class Form extends React.Component {
  async getForecast() {
    // // let city = document.getElementById("searchField").value;
    // // console.log(city);
    // let city = "stockholm";
    // const API_KEY = "abafff9407e6299f362e6d1a0a127946";
    // const api_call = await fetch(
    //   `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    // );
    // const data = await api_call.json();
    // console.log(data);
    // let area = data.name;
    // let temp = data.main.temp;
    // this.setState({ area: area, temp: temp });
  }

  render() {
    //   const Input = (): JSX.Element => {
    //     const [inputValue, setInputValue] = useState<string>("");
    //     return (
    //         <input
    //             type="text"
    //             value={inputValue}
    //             onChange={(
    //                 ev: React.ChangeEvent<HTMLInputElement>,
    //             ): void => setInputValue(ev.target.value)}
    //         />
    //     );
    // };

    return (
      <form onSubmit={this.getForecast}>
        <input
          id="searchField"
          name="searchQuery"
          type="text"
          placeholder="Search location here..."
        />
      </form>
    );
  }
}

export default Form;
