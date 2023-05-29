#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string first = get_string("What's your first name? ");
    string last = get_string("What's your last name? ");
    printf("hello, %s %s\n", first, last);
}