package com.example.smoothie.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(generator = "order_id_seq")
    @SequenceGenerator(name = "order_id_seq")
    private Long id;

    private String name;

    private String address;

    private String content;
}
