/**
 * @generated SignedSource<<00352d617c96d197cea924729ab547eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaBrowseCharactersFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseCharactersFragment">;
  readonly " $fragmentType": "MetaBrowseCharactersFragment";
};
export type MetaBrowseCharactersFragment$key = {
  readonly " $data"?: MetaBrowseCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaBrowseCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaBrowseCharactersFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerBrowseCharactersFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "99f88e099c46ee8d2e3498ac89f06d95";

export default node;
