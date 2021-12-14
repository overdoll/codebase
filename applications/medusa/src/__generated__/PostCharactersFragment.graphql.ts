/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostCharactersFragment = {
    readonly characters: ReadonlyArray<{
        readonly name: string;
        readonly series: {
            readonly title: string;
        };
    }>;
    readonly " $refType": "PostCharactersFragment";
};
export type PostCharactersFragment$data = PostCharactersFragment;
export type PostCharactersFragment$key = {
    readonly " $data"?: PostCharactersFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostCharactersFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Series",
          "kind": "LinkedField",
          "name": "series",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'd0e57e5f22fd7d3231cd163d507ba546';
export default node;
