<?php

it('returns a successful response', function () {
    $response = $this->get('index');

    $response->assertStatus(200);
});
