#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string strings[] = {"battleship", "boot", "cannon", "iron", "thimble", "top hat"};
    string n = get_string("Number: ");
    for (int i = 0; i < 6; i++)
    {
        if (strings[i] == n)
        {
            printf("Found\n");
            return 0;
        }
    }
    printf("Not Found\n");
    return 1;
}