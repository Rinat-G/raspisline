package ru.urfu.raspisline.model.possibility;

import lombok.Value;

@Value
public class PossibilityItem {
    Possibility possibility;
    String cause;
}
