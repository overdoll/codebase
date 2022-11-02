/**
 * @generated SignedSource<<96a98cb4953a76d91e0b3dea779ed9ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStaticRequestCharactersFragment$data = {
  readonly characterRequests: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "PostStaticRequestCharactersFragment";
};
export type PostStaticRequestCharactersFragment$key = {
  readonly " $data"?: PostStaticRequestCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticRequestCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStaticRequestCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CharacterRequest",
      "kind": "LinkedField",
      "name": "characterRequests",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "daea2f6c0bb68cc1fb215281f77d3b49";

export default node;
