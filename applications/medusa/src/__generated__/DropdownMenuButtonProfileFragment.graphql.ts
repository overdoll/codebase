/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DropdownMenuButtonProfileFragment = {
    readonly username: string;
    readonly avatar: {
        readonly urls: ReadonlyArray<{
            readonly url: string;
        }>;
    } | null;
    readonly " $refType": "DropdownMenuButtonProfileFragment";
};
export type DropdownMenuButtonProfileFragment$data = DropdownMenuButtonProfileFragment;
export type DropdownMenuButtonProfileFragment$key = {
    readonly " $data"?: DropdownMenuButtonProfileFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DropdownMenuButtonProfileFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DropdownMenuButtonProfileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "avatar",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '27b027ff6771aefb9c77d10e5ccd7c80';
export default node;
