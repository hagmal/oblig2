package DATA1700.oblig2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {
    public final List<Kinobillett> alleBilletter = new ArrayList<>();
    @PostMapping("/lagreBillett")
    public void lagreBillett (Kinobillett innBillett) {
        alleBilletter.add(innBillett);
    }
    @GetMapping("/hentBilletter")
    public List<Kinobillett> hentBilletter() {
        return alleBilletter;
    }
}
