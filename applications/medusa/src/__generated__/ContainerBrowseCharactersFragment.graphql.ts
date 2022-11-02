/**
 * @generated SignedSource<<b5ec690d6b54915e167134dbcb06c000>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerBrowseCharactersFragment$data = {
  readonly viewer: {
    readonly __typename: "Account";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseCharactersFragment">;
  readonly " $fragmentType": "ContainerBrowseCharactersFragment";
};
export type ContainerBrowseCharactersFragment$key = {
  readonly " $data"?: ContainerBrowseCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerBrowseCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollBrowseCharactersFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "fc52c21ee7728ed55f739191541f50bc";

export default node;
