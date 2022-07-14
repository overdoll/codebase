/**
 * @generated SignedSource<<32a4abacfc7bbb71c501e56136cb8d77>>
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

(node as any).hash = "b34c37c164429df344982ff458d06b4e";

export default node;
