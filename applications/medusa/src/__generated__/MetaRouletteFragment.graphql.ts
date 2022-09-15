/**
 * @generated SignedSource<<649a684f148976e1fa22a1f7cc8db8f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaRouletteFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRouletteFragment">;
  readonly " $fragmentType": "MetaRouletteFragment";
};
export type MetaRouletteFragment$key = {
  readonly " $data"?: MetaRouletteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaRouletteFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaRouletteFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerRouletteFragment"
    }
  ],
  "type": "GameSessionStatus",
  "abstractKey": "__isGameSessionStatus"
};

(node as any).hash = "47dc7fc491182d8d2f662788623760d8";

export default node;
