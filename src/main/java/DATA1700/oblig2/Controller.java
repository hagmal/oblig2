package DATA1700.oblig2;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {
    // Liste som lagrer alle billettene (array)
    public final List<Kinobillett> alleBilletter = new ArrayList<>();

    // Lagrer en ny billett
    @PostMapping("/lagreBillett")
    public void lagreBillett (Kinobillett innBillett) {
        alleBilletter.add(innBillett);
    }

    // Henter alle lagrede billetter
    @GetMapping("/hentBilletter")
    public List<Kinobillett> hentBilletter() {
        return alleBilletter;
    }

    // Sletter alle lagrede billetter
    @DeleteMapping("/slettAlleBilletter")
    public void slettAlleBilletter() {
        alleBilletter.clear();
    }
}
