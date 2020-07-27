import { normalizeNewsData } from "./index";

describe("Utils", () => {
  test("should  normalize the API Data", () => {
    //arrange
    const input = {
      hits: [
        {
          points: 430,
          num_comments: 201,
          objectID: "222",
        },
        {
          points: 8,
          num_comments: 21,
          objectID: "111",
        },
      ],
      page: 0,
      nbPages: 2,
      hitsPerPage: 20,
    };

    const expected = {
      data: {
        "222": {
          points: 430,
          num_comments: 201,
          objectID: "222",
          sno: 1,
        },
        "111": {
          points: 8,
          num_comments: 21,
          objectID: "111",
          sno: 2,
        },
      },
      page: {
        currentPage: input.page,
        totalPages: input.nbPages,
        hitsPerPage: input.hitsPerPage,
      },
    };

    //act
    const actual = normalizeNewsData(input);
    //assert
    expect(actual).toEqual(expected);
  });
});
