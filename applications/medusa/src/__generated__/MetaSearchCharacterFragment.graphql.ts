/**
 * @generated SignedSource<<a08b7fe672071c03e896fe8a6ef9b903>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchCharacterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCharacterFragment" | "SearchCharacterRichObjectFragment">;
  readonly " $fragmentType": "MetaSearchCharacterFragment";
};
export type MetaSearchCharacterFragment$key = {
  readonly " $data"?: MetaSearchCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchCharacterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCharacterRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchCharacterFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "f368ec69eb0b71897a5aa5c1314e6c99";

export default node;
