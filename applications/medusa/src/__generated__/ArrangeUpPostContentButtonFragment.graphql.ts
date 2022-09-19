/**
 * @generated SignedSource<<f461c1da6b43878c05ba772fe825b231>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeUpPostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ArrangeUpPostContentButtonFragment";
};
export type ArrangeUpPostContentButtonFragment$key = {
  readonly " $data"?: ArrangeUpPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUpPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeUpPostContentButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "460e96b539f988cc93377094da24a0ae";

export default node;
