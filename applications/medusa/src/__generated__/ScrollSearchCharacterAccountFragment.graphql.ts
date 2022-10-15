/**
 * @generated SignedSource<<bfe55410658ed8b5e439ac92d9402c37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollSearchCharacterAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
  readonly " $fragmentType": "ScrollSearchCharacterAccountFragment";
};
export type ScrollSearchCharacterAccountFragment$key = {
  readonly " $data"?: ScrollSearchCharacterAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCharacterAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollSearchCharacterAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsFiltersFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "92c89708b385232a679b518814dd42ad";

export default node;
