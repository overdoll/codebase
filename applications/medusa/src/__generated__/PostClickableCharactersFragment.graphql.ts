/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostClickableCharactersFragment = {
    readonly characters: ReadonlyArray<{
        readonly name: string;
        readonly series: {
            readonly title: string;
        };
        readonly thumbnail: {
            readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
        } | null;
    }>;
    readonly " $refType": "PostClickableCharactersFragment";
};
export type PostClickableCharactersFragment$data = PostClickableCharactersFragment;
export type PostClickableCharactersFragment$key = {
    readonly " $data"?: PostClickableCharactersFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostClickableCharactersFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostClickableCharactersFragment",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
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
(node as any).hash = '1dd7ee62751b27f842e533876ce4b40f';
export default node;
