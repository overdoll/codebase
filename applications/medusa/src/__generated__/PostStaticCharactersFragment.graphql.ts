/**
 * @generated SignedSource<<9f55eb7026cff90d1d0de363a1ea09ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStaticCharactersFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly series: {
      readonly title: string;
    } | null;
  }>;
  readonly " $fragmentType": "PostStaticCharactersFragment";
};
export type PostStaticCharactersFragment$key = {
  readonly " $data"?: PostStaticCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStaticCharactersFragment",
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
          "name": "id",
          "storageKey": null
        },
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

(node as any).hash = "94d285d7198a2bf2bc6c55244038b9c5";

export default node;
