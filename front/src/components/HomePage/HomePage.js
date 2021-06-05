import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCogs,
    faHistory,
    faDownload,
    faListOl,
    faMagic,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

function HomePage() {
    return (
        <div className="HomePage">
            <header className="HomePage__header">
                <h1>
                    Witajcie na stronie organizatora zawodów łuczniczych
                    Amazonka!
                </h1>
            </header>
            <div className="container">
                <h2>Czym jest Amazonka?</h2>
                <p>
                    Jest to odpowiedź na brak komunikacji między zawodnikiem a
                    organizatorem oraz słabą automatyzację zawodów łuczniczych w
                    naszym kraju. Dzięki Amazonce dostajesz możliwość
                    komunikowania zawodnikom podstawowych informacji o zawodach
                    takich jak harmonogram, rozstawienie oraz wyniki bez żadnych
                    pośredników i natychmiast po jednym kliknięciu. Dodatkowo
                    zapewniamy automatyzację w podstawowych czynnościach
                    organizacyjnych, które zawsze wyglądają tak samo np.
                    sumowanie wyników, czy rozpisywanie eliminacji.
                </p>
                <h2>Co zyskujesz dzięki naszej aplikacji?</h2>
                <p class="HomePage__container">
                    <div class="HomePage__card">
                        <FontAwesomeIcon
                            className="HomePage__card-icon"
                            icon={faCogs}
                        />
                        <h3 className="HomePage__card-heading">
                            Automatyczne podliczanie wyników
                        </h3>
                        <p className="HomePage__card-content">
                            Na naszej witrynie możesz wpisywać pojedyncze
                            strzały lub wynik serii, a system wyliczy
                            wyniki całościowe oraz ustawi ranking na ich
                            podstawie.
                        </p>
                    </div>
                    <div class="HomePage__card">
                        <FontAwesomeIcon
                            className="HomePage__card-icon"
                            icon={faDownload}
                        />
                        <h3 className="HomePage__card-heading">
                            Wpisywanie wyników przez zawodników
                        </h3>
                        <p className="HomePage__card-content">
                            Możesz udostępnić możliwość wpisywania wyników do
                            systemu zawodnikom, przez co nie będziesz musiał
                            przejmować się zbieraniem metryczek podczas zawodów.
                        </p>
                    </div>
                    <div class="HomePage__card">
                        <FontAwesomeIcon
                            className="HomePage__card-icon"
                            icon={faHistory}
                        />
                        <h3 className="HomePage__card-heading">
                            Wyniki dostępne dla użytkowników na żywo
                        </h3>
                        <p className="HomePage__card-content">
                            Po wpisaniu każdej serii w naszym systemie, gdy
                            klikniesz "podlicz wyniki", udostępniasz najnowszy
                            ranking wszystkim osobom, które wejdą na tę stronę.
                        </p>
                    </div>
                    <div class="HomePage__card">
                        <FontAwesomeIcon
                            className="HomePage__card-icon"
                            icon={faListOl}
                        />
                        <h3 className="HomePage__card-heading">
                            Automatyczne generowanie rozstawienia
                        </h3>
                        <p className="HomePage__card-content">
                            Wystarczy, że wpiszesz zawodników do naszego systemu
                            i przydzielisz im kategorie, a system
                            wygeneruje rozstawienie za ciebie.
                        </p>
                    </div>
                    <div class="HomePage__card">
                        <FontAwesomeIcon
                            className="HomePage__card-icon"
                            icon={faMagic}
                        />
                        <h3 className="HomePage__card-heading">
                            Automatyczne przetwarzanie eliminacji
                        </h3>
                        <p className="HomePage__card-content">
                            Na podstawie wyników kwalifikacji system
                            potrafi wygenerować drabinki eliminacyjne.
                        </p>
                    </div>
                    <div class="HomePage__card">
                        <FontAwesomeIcon
                            className="HomePage__card-icon"
                            icon={faThumbsUp}
                        />
                        <h3 className="HomePage__card-heading">
                            Intuicyjny interfejs
                        </h3>
                        <p className="HomePage__card-content">
                            Dzięki naszej aplikacji organizacja zawodów
                            łuczniczych stanie się prosta i szybka, a
                            zaoszczędzony czas będziesz mógł poświecić na inne
                            rzeczy.
                        </p>
                    </div>
                </p>
            </div>
        </div>
    );
}
export default HomePage;
